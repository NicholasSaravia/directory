import { getMembersByBirthdayOrAnniversary } from "@/utils/api/data";
import { getMonthName } from "@/utils/date";
import { MonthInfo } from "./MonthInfo";

export const Month = async () => {
  const month = new Date().getMonth() + 1;

  const members = await getMembersByBirthdayOrAnniversary(month);
  console.log({ members });

  return (
    <section className="bg-white border-2 border-green-800 border-dashed relative px-4 pt-4 pb-6 rounded-lg w-full sm:w-10/12 mx-auto min-h-[100px]">
      <MonthInfo members={members} month={month} />
    </section>
  );
};
