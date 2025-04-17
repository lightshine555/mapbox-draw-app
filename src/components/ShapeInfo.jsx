import React from 'react';
import { observer } from 'mobx-react-lite';
import shapeStore from '../store/ShapeStore';
import './ShapeInfo.css';

const ShapeInfo = observer(() => {
  const shapes = shapeStore.shapes;

  return (
    <div className="shape-info">
      <h3>Shape Info (from MobX Store)</h3>
      <p>Total Shapes: {shapeStore.shapeCount}</p>
      {shapes.length > 0 ? (
        <ul>
          {shapes.map(shape => (
            <li key={shape.id}>
              ID: {shape.id.substring(0, 8)}... | Type: {shape.geometry.type}
              {/* Add more details or actions here */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No shapes drawn yet.</p>
      )}
    </div>
  );
});

export default ShapeInfo;