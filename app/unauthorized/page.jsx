export default function UnauthorizedScreen({ searchParams }) {
  return (
    <div className="mx-auto mt-[35vh] text-center">
      <h1 className="text-gray-900 text-2xl font-bold">Access Denied</h1>
      <h2 className="text-red-500 text-xl font-bold">
        {searchParams.message || "Authorization required"}
      </h2>
    </div>
  );
}
