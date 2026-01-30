import ArrowPathIcon from "@heroicons/react/24/outline/ArrowPathIcon";

const Submit = ({ formik, textContent = "Submit", loadingText = "Please wait", ...props }) => {
    return (
        <button
            className={`btn capitalize border-none ${
                formik.isSubmitting || !formik.isValid
                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                    : "bg-primary text-primary-content"
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
