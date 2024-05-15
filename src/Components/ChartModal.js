import React, { useEffect, useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";

const ChartModal = ({ data, setShowPollChart }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
      },
    ],
  });

  const viewPollVoteChart = (pollData) => {
    const optionList = pollData.optionList.map(
      ({ optionTitle, voteCount }) => ({ optionTitle, voteCount })
    );
    const labels = optionList.map((items) => items.optionTitle);
    setChartData({
      labels: labels,
      datasets: [
        {
          label: pollData.title,
          data: optionList.map((items) => items.voteCount.length),
        },
      ],
    });
  };

  useEffect(() => {
    viewPollVoteChart(data);
  }, []);
  return (
    <div className="fixed inset-0 flex justify-center items-center z-10">
      <div
        className="modal-overlay fixed inset-0 bg-gray-500 opacity-50"
        onClick={() => setShowPollChart(false)}
      ></div>
      <div className="modal-container p-4 bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto flex flex-col items-center">
        <h3 className="mb-4">Poll result</h3>
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default ChartModal;
