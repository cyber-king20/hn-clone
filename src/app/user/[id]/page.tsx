import { fetchUser } from "@/lib/hn";
import { formatTime } from "@/lib/utils";

export default async function UserPage({
  params,
}: {
  params: { id: string };
}) {
  const {id} = await params;
  const user = await fetchUser(id);

  return (
    <main className="max-w-3xl mx-auto p-4">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h1 className="text-2xl font-bold mb-4">{user.id}</h1>
        <div className="space-y-2 text-gray-600">
          <p>Created: {formatTime(user.created)}</p>
          <p>Karma: {user.karma}</p>
          {user.about && (
            <>
              <p>About:</p>
              <div
                className="prose prose-sm mt-4"
                dangerouslySetInnerHTML={{ __html: user.about }}
              />
            </>
          )}
        </div>
      </div>
    </main>
  );
}