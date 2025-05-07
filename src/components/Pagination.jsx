import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Pagination = ({
    currentPage,
    totalPages,
    onClickPrev,
    onClickNext,
}) => {
    return (
        <div className="flex flex-col gap-3 lg:flex-row justify-center items-center my-8 space-x-4">
            <p className="text-sm text-gray-600">
                Page
                <span className="font-bold bg-[#DEAA4E] text-white px-[3px] py-[1px] mx-1 rounded">
                    {currentPage}
                </span>{" "}
                of
                <span className="font-bold bg-[#DEAA4E] text-white px-[3px] py-[1px] mx-1 rounded">
                    {totalPages}
                </span>{" "}
                pages
            </p>
            <div className="flex items-center space-x-4">
                <button
                    className={`flex items-center bg-gray-800 text-white px-4 py-2 rounded-md transition ${currentPage <= 1
                        ? "!bg-gray-400 cursor-not-allowed"
                        : "hover:bg-indigo-600"
                        }`}
                    disabled={currentPage <= 1}
                    onClick={onClickPrev}
                >
                    <IoIosArrowBack className="w-4 h-4 mr-2" />
                    Previous
                </button>

                <button
                    className={`flex items-center bg-gray-800 text-white px-4 py-2 rounded-md transition ${currentPage === totalPages || totalPages === 0
                        ? "!bg-gray-400 cursor-not-allowed"
                        : "hover:bg-indigo-600"
                        }`}
                    disabled={currentPage === totalPages || totalPages === 0}
                    onClick={onClickNext}
                >
                    Next
                    <IoIosArrowForward className="w-4 h-4 ml-2" />
                </button>
            </div>
        </div>
    );
};

export default Pagination;
