import { useEffect, useState } from "react";

const FlashSale = () => {
  // เวลาเริ่มต้น 3 ชั่วโมง (3 * 60 * 60 = 10800 วินาที)
  const initialTime = 3 * 60 * 60;

  // ฟังก์ชันสำหรับอ่านเวลาที่เหลือและเวลาล่าสุดที่บันทึกจาก localStorage
  const getSavedTimeInfo = () => {
    try {
      const savedData = localStorage.getItem("flashsaleTimer");
      if (savedData) {
        const { timeRemaining, timestamp } = JSON.parse(savedData);

        // คำนวณเวลาที่ผ่านไปตั้งแต่ครั้งล่าสุดที่บันทึก (เป็นวินาที)
        const now = new Date().getTime();
        const elapsedSeconds = Math.floor((now - timestamp) / 1000);

        // คำนวณเวลาที่เหลือปัจจุบัน
        let currentTimeRemaining = timeRemaining - elapsedSeconds;

        // ถ้าเวลาที่เหลือน้อยกว่า 0 ให้คำนวณว่าผ่านไปกี่รอบและเหลือเวลาเท่าไร
        if (currentTimeRemaining <= 0) {
          currentTimeRemaining =
            initialTime - (Math.abs(currentTimeRemaining) % initialTime);
        }

        return currentTimeRemaining > 0 ? currentTimeRemaining : initialTime;
      }
    } catch (error) {
      console.error("Error reading from localStorage:", error);
    }

    return initialTime;
  };

  const [timeLeft, setTimeLeft] = useState(() => getSavedTimeInfo());

  // บันทึกเวลาที่เหลือลงใน localStorage
  const saveTimeInfo = (remaining: number) => {
    try {
      const timeInfo = {
        timeRemaining: remaining,
        timestamp: new Date().getTime(),
      };
      localStorage.setItem("flashsaleTimer", JSON.stringify(timeInfo));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  };

  useEffect(() => {
    // บันทึกเวลาเมื่อเริ่มต้นโหลดคอมโพเนนต์
    saveTimeInfo(timeLeft);

    // สร้าง interval ที่จะทำงานทุกๆ 1 วินาที
    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = prevTime <= 1 ? initialTime : prevTime - 1;

        // บันทึกเวลาลง localStorage ทุก 10 วินาที เพื่อลดการเขียนลงหน่วยความจำที่มากเกินไป
        if (newTime % 10 === 0) {
          saveTimeInfo(newTime);
        }

        return newTime;
      });
    }, 1000);

    // บันทึกเวลาเมื่อปิดแท็บหรือออกจากหน้าเว็บ
    const handleBeforeUnload = () => {
      saveTimeInfo(timeLeft);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup function
    return () => {
      clearInterval(intervalId);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      saveTimeInfo(timeLeft);
    };
  }, [timeLeft]);

  // แปลงเวลาให้อยู่ในรูปแบบ hh:mm:ss
  const formatTime = () => {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-row lg:flex-col items-center justify-between p-4 sm:p-6 lg:p-8 ">
      <div className="bg-gradient-to-r from-red-500 to-yellow-500 p-1 rounded-lg shadow-md">
        <div className="bg-white px-2 lg:p-4 rounded-md">
          <div className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-mono font-semibold text-gray-800">
            {formatTime()}
            <div className="flex justify-between mx-2">
              <p className="text-sm hidden lg:block">Hours</p>
              <p className="text-sm hidden lg:block">Minutes</p>
              <p className="text-sm hidden lg:block">Seconds</p>
              <p className="text-sm lg:hidden">H</p>
              <p className="text-sm lg:hidden">M</p>
              <p className="text-sm lg:hidden">S</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:hidden gap-2">
        <h4 className="text-[18px] max-[400px]:text-[16px] sm:text-2xl md:text-4xl   font-semibold text-gray-200">
          SPECIAL DEAL OF THE DAY
        </h4>
        <p className="text-lg font-light text-gray-200">Discount up to 50%</p>
      </div>

      <div className="hidden lg:flex flex-col gap-2">
        <h4 className="mt-4 text-4xl font-semibold text-gray-200">
          SPECIAL DEAL OF THE DAY
        </h4>
        <p className="mt-2 text-lg font-light text-gray-200">
          Discount up to 50%
        </p>
      </div>
    </div>
  );
};
export default FlashSale;
