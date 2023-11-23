type PageProps = {
  params: {
    username: string;
    list: string;
  };
};

export default async function Page({ params }: PageProps) {
  const { username, list } = params;

  return (
    <div className="h-full w-full max-w-3xl">
      <div className="flex flex-col gap-y-6">
        <h1>
          users {username} list {list}
        </h1>
      </div>
    </div>
  );
}
