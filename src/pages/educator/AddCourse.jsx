import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useFormik } from "formik";
import { AppContext } from "../../context/AppContext";
import { useNavigate, useLocation } from "react-router";
import { v4 as uuidv4 } from "uuid";
import Quill from 'quill';
import { useParams } from 'react-router';


const AddCourse = () => {
  const quillRef = useRef(null);
  const editorRef = useRef(null);
  const navigate = useNavigate();
  const { courseId } = useParams();
  const isEditMode = !!courseId;
  const [loading, setLoading] = useState(false);
  const {
    courses,
    setCourses,
    educatorId,
    allEducators,
    setAllEducators
  } = useContext(AppContext);


  const courseToEdit = useMemo(() => courses.find(course => course._id === courseId), 
  [courses, courseId]
);



  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        modules: { toolbar: true },
        theme: 'snow'
      });
    }
  }, []);

  useEffect(() => {
    if (isEditMode && quillRef.current) {
      quillRef.current.root.innerHTML = courseToEdit.courseDescription || "";
    }
  }, [isEditMode, courseToEdit]);

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    formik.setFieldValue("courseThumbnail", file);
  };

  const handleAddChapter = () => {
    const newChapter = { id: uuidv4(), title: "", lectures: [] };
    formik.setFieldValue("Chapters", [...formik.values.Chapters, newChapter]);
  };

  const handleRemoveChapter = (chapterId) => {
    const updated = formik.values.Chapters.filter((ch) => ch.id !== chapterId);
    formik.setFieldValue("Chapters", updated);
  };

  const handleChapterTitleChange = (id, title) => {
    const updated = formik.values.Chapters.map((ch) =>
      ch.id === id ? { ...ch, title } : ch
    );
    formik.setFieldValue("Chapters", updated);
  };

  const handleAddLecture = (chapterId) => {
    const updated = formik.values.Chapters.map((ch) => {
      if (ch.id === chapterId) {
        return {
          ...ch,
          lectures: [
            ...ch.lectures,
            {
              id: uuidv4(),
              lectureTitle: "",
              lectureUrl: "",
              lectureDuration: null,
              isPreviewFree: false,
            },
          ],
        };
      }
      return ch;
    });
    formik.setFieldValue("Chapters", updated);
  };

  const handleLectureChange = (chapterId, lectureId, field, value) => {
    const updated = formik.values.Chapters.map((ch) => {
      if (ch.id === chapterId) {
        return {
          ...ch,
          lectures: ch.lectures.map((lec) =>
            lec.id === lectureId ? { ...lec, [field]: value } : lec
          ),
        };
      }
      return ch;
    });
    formik.setFieldValue("Chapters", updated);
  };

  const handleRemoveLecture = (chapterId, lectureId) => {
    const updated = formik.values.Chapters.map((ch) => {
      if (ch.id === chapterId) {
        return {
          ...ch,
          lectures: ch.lectures.filter((lec) => lec.id !== lectureId),
        };
      }
      return ch;
    });
    formik.setFieldValue("Chapters", updated);
  };

  const handleCourseSubmit = (values) => {
    setLoading(true);

    const courseThumbnail = values.courseThumbnail instanceof File
      ? URL.createObjectURL(values.courseThumbnail)
      : values.courseThumbnail || "https://via.placeholder.com/150";

    const formattedChapters = values.Chapters.map((ch, i) => ({
      chapterId: ch.id,
      chapterOrder: i + 1,
      chapterTitle: ch.title,
      chapterContent: ch.lectures.map((lec, j) => ({
        lectureId: lec.id,
        lectureTitle: lec.lectureTitle,
        lectureUrl: lec.lectureUrl,
        lectureDuration: Number(lec.lectureDuration),
        isPreviewFree: lec.isPreviewFree,
        lectureOrder: j + 1,
      }))
    }));

    const newCourse = {
      _id: isEditMode ? courseToEdit._id : uuidv4(),
      courseTitle: values.courseTitle,
      coursePrice: Number(values.coursePrice),
      discount: Number(values.discount),
      courseDescription: quillRef.current?.root.innerHTML || "",
      courseThumbnail,
      educatorId,
      enrolledStudentIds: courseToEdit?.enrolledStudentIds || [],
      courseRatings: courseToEdit?.courseRatings || [],
      courseContent: formattedChapters,
      updatedAt: new Date().toISOString(),
    };

    const updatedCourses = isEditMode
      ? courses.map((course) => course._id === newCourse._id ? newCourse : course)
      : [...courses, newCourse];

    setCourses(updatedCourses);

    const updatedEducators = allEducators.map((ed) => {
      if (ed._id === educatorId) {
        const updatedCourseIds = isEditMode
          ? ed.courses
          : [...ed.courses, newCourse._id];
        return { ...ed, courses: updatedCourseIds };
      }
      return ed;
    });
    setAllEducators(updatedEducators);

    setLoading(false);
    navigate("/educator/my-courses");
  };

  const formik = useFormik({
    initialValues: {
      courseTitle: courseToEdit?.courseTitle || "",
      coursePrice: courseToEdit?.coursePrice || 0,
      discount: courseToEdit?.discount || 0,
      courseThumbnail: courseToEdit?.courseThumbnail || null,
      Chapters: courseToEdit?.courseContent.map((ch) => ({
        id: ch.chapterId,
        title: ch.chapterTitle,
        lectures: ch.chapterContent.map((lec) => ({
          id: lec.lectureId,
          lectureTitle: lec.lectureTitle,
          lectureUrl: lec.lectureUrl,
          lectureDuration: lec.lectureDuration,
          isPreviewFree: lec.isPreviewFree,
        }))
      })) || [],
    },
    onSubmit: handleCourseSubmit
  });

  return (
    <div>
      <h2 className="text-4xl font-semibold mb-5">
        {isEditMode ? "Edit Course" : "Add New Course"}
      </h2>

      <form onSubmit={formik.handleSubmit}>
        {/* Upload Image */}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium">Upload Course Poster</label>
          <input
            required={!isEditMode} // Required only in Add mode
            type="file"
            id="courseThumbnail"
            onChange={handleFileChange}
            className="block w-full p-2 border rounded-lg"
          />

          {/* Display filename in edit mode */}
          {isEditMode && typeof formik.values.courseThumbnail === "string" && (
            <p className="text-sm mt-2 text-gray-600 italic">
              Current file: {formik.values.courseThumbnail.split("/").pop()}
            </p>
          )}

          {/* Preview the selected image */}
          {formik.values.courseThumbnail && (
            <img
              src={
                formik.values.courseThumbnail instanceof File
                  ? URL.createObjectURL(formik.values.courseThumbnail)
                  : formik.values.courseThumbnail
              }
              alt="Preview"
              className="w-48 h-auto mt-4 border"
            />
          )}
        </div>

        {/* Course Title */}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium">Course Title</label>
          <input
            required
            type="text"
            name="courseTitle"
            value={formik.values.courseTitle}
            onChange={formik.handleChange}
            className="block w-full p-2 border rounded-lg"
          />
        </div>

        {/* Course Price */}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium">Course Price ($)</label>
          <input
            required
            type="number"
            name="coursePrice"
            value={formik.values.coursePrice}
            onChange={formik.handleChange}
            className="block w-full p-2 border rounded-lg"
          />
        </div>

        {/* Course Discount */}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium">Course Discount (%)</label>
          <input
            type="number"
            name="discount"
            value={formik.values.discount}
            onChange={formik.handleChange}
            className="block w-full p-2 border rounded-lg"
          />
        </div>

        {/* Description */}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium">Course Description</label>
          <div
            ref={editorRef}
            className="bg-white border rounded-lg p-2 overflow-y-auto"
            style={{
              height: "200px",
              maxHeight: "200px",
              minHeight: "150px",
              overflowY: "auto",
              scrollbarWidth: "thin", // for Firefox
            }}
          ></div>
        </div>

        {/* Chapters */}
        <div className="mb-5">
          <h3 className="text-2xl font-semibold mb-2">Chapters</h3>
          {formik.values.Chapters.map((chapter) => (
            <div key={chapter.id} className="mb-4 p-4 border rounded-lg bg-gray-50">
              <div className="flex items-center mb-4">
                <input
                  type="text"
                  placeholder="Chapter Title"
                  value={chapter.title}
                  onChange={(e) => handleChapterTitleChange(chapter.id, e.target.value)}
                  className="block w-full p-2 border rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveChapter(chapter.id)}
                  className="text-white bg-red-600 hover:bg-red-700 text-nowrap px-4 py-2 rounded-lg text-sm ml-5"
                >
                  × Remove Chapter
                </button>
              </div>

              {/* Lectures */}
              {chapter.lectures.map((lecture) => (
                <div key={lecture.id} className="mb-3 pl-4 border-l-4 border-blue-300">

                  <input
                    type="text"
                    placeholder="Lecture Title"
                    value={lecture.lectureTitle}
                    onChange={(e) =>
                      handleLectureChange(chapter.id, lecture.id, "lectureTitle", e.target.value)
                    }
                    className="block w-full p-2 mb-1 border rounded-lg"
                  />

                  <input
                    type="text"
                    placeholder="Lecture Video URL"
                    value={lecture.lectureUrl}
                    onChange={(e) =>
                      handleLectureChange(chapter.id, lecture.id, "lectureUrl", e.target.value)
                    }
                    className="block w-full p-2 mb-1 border rounded-lg"
                  />
                  <input
                    type="number"
                    placeholder="Lecture Duration (minutes)"
                    value={lecture.lectureDuration}
                    onChange={(e) =>
                      handleLectureChange(chapter.id, lecture.id, "lectureDuration", e.target.value)
                    }
                    className="block w-full p-2 mb-1 border rounded-lg"
                  />
                  <label className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      checked={lecture.isPreviewFree}
                      onChange={(e) =>
                        handleLectureChange(chapter.id, lecture.id, "isPreviewFree", e.target.checked)
                      }
                    />
                    <span>Is Preview Free?</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => handleRemoveLecture(chapter.id, lecture.id)}
                    className="text-white bg-red-600 hover:bg-red-700 text-nowrap px-4 py-2 rounded-lg text-sm mt-5"
                  >
                    × Remove Lecture
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() => handleAddLecture(chapter.id)}
                className="text-white bg-green-600 hover:bg-green-700 px-3 py-2 rounded-lg text-sm mt-2"
              >
                + Add Lecture
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddChapter}
            className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg text-sm"
          >
            + Add Chapter
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          {loading
            ? isEditMode ? "Updating Course..." : "Adding Course..."
            : isEditMode ? "Update Course" : "Add Course"}
        </button>

      </form>
    </div>
  );
};

export default AddCourse;
