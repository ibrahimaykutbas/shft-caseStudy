// Günlük - Haftalık - Aylık olarak gruplama işlemini gerçekleştirmek için

export const groupDataByType = (intakes, type) => {
    if (type === 'daily') {
      return intakes;
    } else if (type === 'weekly') {
      const weeklyData = [];
  
      const sortedData = intakes.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  
      let currentWeekStartDate = new Date(sortedData[0].createdAt);
      currentWeekStartDate.setHours(0, 0, 0, 0);
  
      let currentWeekEndDate = new Date(currentWeekStartDate);
      currentWeekEndDate.setDate(currentWeekEndDate.getDate() + 6);
  
      let currentWeekTotalAmount = 0;
  
      sortedData.forEach((item) => {
        const itemDate = new Date(item.createdAt);
  
        if (itemDate >= currentWeekStartDate && itemDate <= currentWeekEndDate) {
          currentWeekTotalAmount += item.amount;
        } else {
          const weekData = {
            amount: currentWeekTotalAmount,
            createdAt: `${currentWeekStartDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - ${currentWeekEndDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`,
            unit: 'ml'
          };
  
          weeklyData.push(weekData);
  
          currentWeekStartDate = new Date(item.createdAt);
          currentWeekStartDate.setHours(0, 0, 0, 0);
  
          currentWeekEndDate = new Date(currentWeekStartDate);
          currentWeekEndDate.setDate(currentWeekEndDate.getDate() + 6);
  
          currentWeekTotalAmount = item.amount;
        }
      });
  
      const lastWeekData = {
        amount: currentWeekTotalAmount,
        createdAt: `${currentWeekStartDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - ${currentWeekEndDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`,
        unit: 'ml'
      };
  
      weeklyData.push(lastWeekData);
  
      return weeklyData;
    } else if (type === 'monthly') {
      const monthlyData = {};
  
      intakes.forEach((item) => {
        const createdAt = new Date(item.createdAt);
        const monthYear = `${createdAt.toLocaleString('en-US', { month: 'long' })} ${createdAt.getFullYear()}`;
  
        if (!monthlyData[monthYear]) {
          monthlyData[monthYear] = {
            amount: 0,
            createdAt: monthYear,
            unit: 'ml'
          };
        }
  
        monthlyData[monthYear].amount += item.amount;
      });
  
      return Object.values(monthlyData);
    }
  
    return [];
  };