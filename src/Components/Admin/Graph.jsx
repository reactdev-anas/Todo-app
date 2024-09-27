import React, { useState, useEffect } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from 'recharts';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

function Graph() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch or compute the data here
    // Example static data for demonstration
    const fetchData = () => {
      const users = JSON.parse(localStorage.getItem('user')) || [];
      const userTasks = users.map(user => {
        const todos = JSON.parse(localStorage.getItem(`todos_${user.email}`)) || [];
        const completedTasks = todos.filter(todo => todo.completed).length;
        return {
          name: user.name, // Display user's email
          uv: completedTasks // Number of completed tasks
        };
      });
      setData(userTasks);
    };

    fetchData();
  }, []);

  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
    Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  return (
    <div className="graph">
      <h3>Graph of Completed Tasks by Individual Users</h3>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Bar dataKey="uv" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Bar>
      </BarChart>
      <div className="graph-uv">
        <h3>uv: <span>Completed Tasks</span></h3>
      </div>
    </div>
  );
}

export default Graph;
