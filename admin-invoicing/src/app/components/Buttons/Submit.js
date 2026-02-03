import ArrowPathIcon from "@heroicons/react/24/outline/ArrowPathIcon";

const Submit = ({ formik, textContent = "Submit", loadingText = "Please wait", ...props }) => {
    return (
        <button
            className={` inline-flex items-center justify-center
  font-medium
  rounded-lg
  text-center
  cursor-pointer
  select-none
  transition-colors duration-200
  shadow-sm
  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-700
  px-4 py-2
  capitalize
  border-none ${formik.isSubmitting || !formik.isValid
                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                    : "bg-primary text-white"
                } ${props.className}`}
            disabled={formik.isSubmitting || !formik.isValid}
            type='submit'
        >
            {formik.isSubmitting ? (
                <span className="inline-flex items-center gap-2">
                    <ArrowPathIcon className="w-6 h-6 animate-spin" />
                    <span>{loadingText}...</span>
                </span>
            ) : (
                textContent
            )}
        </button>
    );
};

export default Submit;
