export default function ErrorMessage({ error }) {
    return (
        <>
            <p className="mt-4 text-red-600 justify-center text-center bg-amber-200 font-bold text-lg/6 rounded-md py-1.5">{error}</p>
        </>
    );
}