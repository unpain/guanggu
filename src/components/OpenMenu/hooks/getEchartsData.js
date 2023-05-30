/** @format */

export function getEchartsData(arr) {
  const eventType = Object.entries(
    arr.reduce((acc, curr) => {
      if (acc[curr.事件类型]) {
        acc[curr.事件类型]++;
      } else {
        acc[curr.事件类型] = 1;
      }
      return acc;
    }, {})
  ).map(([name, value]) => ({
    name,
    value,
  }));
  const result1 = arr.reduce((acc, curr) => {
    const date = new Date(curr.发生时间);
    const month = date.getMonth() + 1; // 因为月份是从0开始，需要加1

    if (acc[month + '月']) {
      acc[month + '月']++;
    } else {
      acc[month + '月'] = 1;
    }
    return acc;
  }, {});

  const monthlyStatistic = Object.entries(result1).map(([name, value]) => {
    return { name, value };
  });

  monthlyStatistic.sort((a, b) => {
    console.log(a.name === 'NaN月');

    const nameA = a.name === 'NaN月' ? '未知月' : a.name;
    a.name = nameA;
    const nameB = b.name === 'NaN月' ? '未知月' : b.name;
    b.name = nameB;
    return nameA.localeCompare(nameB, 'zh', { numeric: true });
  });
  return { eventType, monthlyStatistic };
}
