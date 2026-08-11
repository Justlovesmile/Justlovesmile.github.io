(() => {
  const chartNames = [
    ["postsChart", "postsOption"],
    ["tagsChart", "tagsOption"],
    ["categoriesChart", "categoriesOption"],
    ["mapChart", "mapOption"],
    ["trendsChart", "trendsOption"],
    ["sourcesChart", "sourcesOption"],
  ];

  const getTextColor = () =>
    document.documentElement.dataset.theme === "dark"
      ? "rgba(255,255,255,0.9)"
      : "#4c4948";

  const eachOption = (option, callback) => {
    if (!option) return;
    (Array.isArray(option) ? option : [option]).forEach(callback);
  };

  const updateChart = (chartName, optionName) => {
    const chart = window[chartName];
    const option = window[optionName];
    if (!chart || !option) return;

    const color = getTextColor();
    option.textStyle = { ...option.textStyle, color };

    eachOption(option.title, (item) => {
      item.textStyle = { ...item.textStyle, color };
    });
    eachOption(option.legend, (item) => {
      item.textStyle = { ...item.textStyle, color };
    });
    eachOption(option.visualMap, (item) => {
      item.textStyle = { ...item.textStyle, color };
    });
    [option.xAxis, option.yAxis].forEach((axisOption) => {
      eachOption(axisOption, (axis) => {
        axis.axisLabel = { ...axis.axisLabel, color };
        axis.axisLine = {
          ...axis.axisLine,
          lineStyle: { ...axis.axisLine?.lineStyle, color },
        };
        axis.nameTextStyle = { ...axis.nameTextStyle, color };
      });
    });
    eachOption(option.series, (series) => {
      if (series.label) series.label = { ...series.label, color };
      if (series.markLine) {
        series.markLine = {
          ...series.markLine,
          label: { ...series.markLine.label, color },
        };
      }
    });

    chart.setOption(option, true);
  };

  const refresh = () => {
    chartNames.forEach(([chartName, optionName]) =>
      updateChart(chartName, optionName),
    );
  };

  window.refreshSiteChartsTheme = refresh;
  new MutationObserver(refresh).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  document.addEventListener("pjax:complete", () =>
    requestAnimationFrame(refresh),
  );
  refresh();
})();
