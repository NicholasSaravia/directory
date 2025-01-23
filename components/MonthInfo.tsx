"use client";

import { Member } from "@/types";
import { getMembersByBirthdayOrAnniversary } from "@/utils/api/data";
import { getMonthName } from "@/utils/date";
import { useEffect, useState } from "react";

export const MonthInfo = ({
  members: initialMembers,
  month,
}: {
  members?: Member[];
  month: number;
}) => {
  const [members, setMembers] = useState<Member[]>(initialMembers || []);
  const [currentMonth, setCurrentMonth] = useState(month);
  const [monthName, setMonthName] = useState("");
  const handleClick = (month: number) => {
    console.log(month);
    if (month === 0) setCurrentMonth(12);
    else if (month === 13) setCurrentMonth(1);
    else setCurrentMonth(month);
  };
  console.log({ members });

  useEffect(() => {
    getMembersByBirthdayOrAnniversary(currentMonth).then((members) => {
      setMembers(members || []);
    });
    const monthName = getMonthName(currentMonth);
    setMonthName(monthName);
  }, [currentMonth]);

  // add a back arrow and right arrow to navigate between months
  return (
    <>
      <h2 className="font-bold text-2xl text-center mb-4">{monthName}</h2>
      <div className="flex flex-wrap justify-center gap-4 w-full ">
        <button onClick={() => handleClick(currentMonth - 1)}>Back</button>
        {members?.length === 0 && (
          <div className="flex-1 flex justify-center items-center text-center text-gray-500">
            No birthdays or anniversaries this month
          </div>
        )}
        {members?.length > 0 && (
          <div className="flex-1 flex justify-center items-center">
            {members?.map((member) => {
              const name = `${member?.name} ${member?.family?.name}`;
              const birthdayMonth = member?.birthday
                ? new Date(member?.birthday).getMonth() + 1
                : null;

              const anniversaryMonth = member?.anniversary
                ? new Date(member?.anniversary).getMonth() + 1
                : null;
              console.log({ birthdayMonth, anniversaryMonth, currentMonth });

              const dayOfBirth = member?.birthday
                ? new Date(member?.birthday).getDate()
                : null;
              const dayOfAnniversary = member?.anniversary
                ? new Date(member?.anniversary).getDay()
                : null;
              const birthdayIsThisMonth = birthdayMonth
                ? birthdayMonth === currentMonth
                : false;
              const anniversaryIsThisMonth = anniversaryMonth
                ? anniversaryMonth === currentMonth
                : false;

              return (
                <div key={member?.id}>
                  {member?.birthday && birthdayIsThisMonth && (
                    <div className="bg-white text-center px-4 py-1 bg-opacity-85 shadow-sm border rounded-full">
                      🎂 {name} · {birthdayMonth}/{dayOfBirth}
                    </div>
                  )}
                  {member?.anniversary && anniversaryIsThisMonth && (
                    <div className="bg-white text-center px-4 py-1 bg-opacity-85 shadow-sm border rounded-full">
                      ❤️ &nbsp;{name} · {anniversaryMonth}/{dayOfAnniversary}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <button onClick={() => handleClick(currentMonth + 1)}>Next</button>
      </div>
    </>
  );
};
