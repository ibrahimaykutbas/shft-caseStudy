// Günlük - Haftalık - Aylık olarak gruplama işlemini gerçekleştirmek için

export const groupDataByType = (intakes, type) => {
  if (type === 'daily') {
    const currentDate = new Date();

    const dailyData = intakes
      .filter(item => {
        const itemDate = new Date(item.createdAt);
        return itemDate.toDateString() === currentDate.toDateString();
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return dailyData;
  } else if (type === 'weekly') {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const startDayIndex = 1;
    const currentDayIndex = currentDate.getDay() + 1;
    const offset = (6 + startDayIndex - currentDayIndex) % 6;
    const startDate = new Date(currentDate);
    startDate.setDate(startDate.getDate());  // - offset;

    const weeklyData = [];

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(currentDate.getDate() - i);

      const filteredData = intakes.filter(item => {
        const itemDate = new Date(item.createdAt);
        itemDate.setHours(0, 0, 0, 0);
        return itemDate.getTime() === currentDate.getTime();
      });

      if (filteredData.length > 0) {
        const totalAmount = filteredData.reduce(
          (sum, item) => sum + Number(item.amount),
          0
        );
        const data = {
          createdAt: currentDate.toLocaleDateString(), // Tarihi dizeye dönüştürüyoruz
          amount: totalAmount,
          unit: 'ml'
        };
        weeklyData.push(data);
      }
    }

    return weeklyData;
  } else if (type === 'monthly') {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const startDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const endDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );

    const monthlyData = [];

    for (let i = startDay.getDate(); i <= endDay.getDate(); i++) {
      const currentDate = new Date();
      currentDate.setFullYear(startDay.getFullYear());
      currentDate.setMonth(startDay.getMonth());
      currentDate.setDate(i);
      currentDate.setHours(0, 0, 0, 0);

      const filteredData = intakes.filter(item => {
        const itemDate = new Date(item.createdAt);
        itemDate.setHours(0, 0, 0, 0);
        return (
          itemDate.getMonth() === currentDate.getMonth() &&
          itemDate.getDate() === currentDate.getDate()
        );
      });

      if (filteredData.length > 0) {
        const totalAmount = filteredData.reduce(
          (sum, item) => sum + Number(item.amount),
          0
        );
        const data = {
          createdAt: currentDate.toLocaleDateString(), // Tarihi dizeye dönüştürüyoruz
          amount: totalAmount,
          unit: 'ml'
        };
        monthlyData.push(data);
      }
    }

    return monthlyData;
  }

  return [];
};
