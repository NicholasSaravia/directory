"use client";
export const Families = ({
  families,
}: {
  families: { name: string; id: string }[] | null;
}) => {
  return (
    <section className="flex flex-wrap gap-4">
      {families?.map((family) => (
        <div className="border p-4" key={family.id}>
          {family.name}
        </div>
      ))}
    </section>
  );
};
