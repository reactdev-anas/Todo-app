import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const colors = ['#008000', '#FF0000', '#0000FF', '#FFFF00', '#808080', 'pink'];

function GraphPercentage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      const users = JSON.parse(localStorage.getItem('user')) || [];
      const userTasks = users.map(user => {
        const todos = JSON.parse(localStorage.getItem(`todos_${user.email}`)) || [];
        const completedTasks = todos.filter(todo => todo.completed).length;
        const totalTasks = todos.length;
        return {
          name: user.name,
          value: completedTasks,
          percentage: totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0,
        };
      });
      setData(userTasks);
    };

    fetchData();
  }, []);

  return (
    <div className="graph-2">
      <h3>Graph of Percentage of Completed Tasks by Individual Users</h3>
      <PieChart width={550} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="45%"
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percentage }) => `${name} (${percentage.toFixed(1)}%)`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
}

export default GraphPercentage;

