import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/images/assets';
import humanizeDuration from "humanize-duration";
import { useMatch } from 'react-router';
import { p } from 'motion/react-client';

const { down_arrow_icon, play_icon, blue_tick_icon } = assets;

const Accordion = ({ course, setPlayerData }) => {
    const isPlayer = useMatch('/player/*')
    const [openChapters, setOpenChapters] = useState([]);
    const { getChapterTime } = useContext(AppContext);



    const toggleChapter = (index) => {
        if (openChapters.includes(index)) {
            setOpenChapters(openChapters.filter(i => i !== index)); // Close chapter
        } else {
            setOpenChapters([...openChapters, index]); // Open chapter
        }
    };

    return (
        <div>
            {course.courseContent.map((chapter, index) => {
                const isOpen = openChapters.includes(index);
                return (
                    <div key={index} className="mb-4 ">
                        <div
                            className="flex flex-col xl:flex-row justify-between items-center cursor-pointer border border-1-gray-300 bg-white rounded-lg p-2 w-full"
                            onClick={() => toggleChapter(index)}
                        >
                            <div className="flex gap-2 items-center">
                                <img
                                    src={down_arrow_icon}
                                    alt="down_arrow_icon"
                                    className={`w-3 h-3 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                                />
                                <h3 className="text-lg font-semibold hover:underline">{chapter.chapterTitle}</h3>
                            </div>
                            <div className="flex gap-2 items-center">
                                <p className="text-gray-500">
                                    {chapter.chapterContent.length} {chapter.chapterContent.length === 1 ? 'Lecture' : 'Lectures'}
                                </p>
                                <span>-</span>
                                <p className="text-sm text-gray-600">{getChapterTime(chapter)}</p>
                            </div>
                        </div>

                        {isOpen && (
                            <ul className="transition-all duration-300 border border-1-gray-300 bg-white rounded-lg p-2 w-full m-0">
                                {chapter.chapterContent.map((lecture, lecIndex) => (

                                    <li key={lecIndex} className="flex flex-col xl:flex-row justify-between py-2 ml-8">
                                        <div className='flex gap-2 items-center'>
                                            <img
                                                src={lecture.isCompleted ? blue_tick_icon : play_icon}
                                                alt="play_icon"
                                                className={`w-4 h-4`}
                                            />
                                            <p className="text-gray-500 hover:text-blue-400 hover:underline cursor-pointer transition-all duration-75">{lecture.lectureTitle}</p>
                                        </div>
                                        <div className="flex gap-2 items-center">
                                            {isPlayer ? (<p onClick={() => {
                                                setPlayerData({
                                                    ...lecture, chapter: index + 1, lecture: lecIndex + 1, videoId: lecture.lectureUrl.split('/').pop(), lectureTitle: lecture.lectureTitle, isCompleted : lecture.isCompleted
                                                });
                                            }}
                                                className="text-blue-500 text-base cursor-pointer hover:underline">
                                                Watch
                                            </p>) : (
                                                lecture.isPreviewFree && (
                                                    <p
                                                        onClick={() => {
                                                            setPlayerData({
                                                                videoId: lecture.lectureUrl.split('/').pop(),
                                                            });
                                                        }}
                                                        className="text-blue-500 text-base cursor-pointer hover:underline"
                                                    >
                                                        Preview
                                                    </p>
                                                )
                                            )}
                                            <p className="text-sm text-gray-600">{
                                                lecture.lectureDuration ? humanizeDuration(lecture.lectureDuration * 60 * 1000, {
                                                    units: ['h', 'm'],
                                                    round: true,
                                                }) : 'N/A'
                                            }</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default Accordion;
