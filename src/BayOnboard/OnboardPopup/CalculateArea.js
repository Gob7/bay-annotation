export default function CalculateArea({ drawingData }) {
  //calculation of area of the polygon
  const calculatePolygonArea = (segments) => {
    // Extract points from the segments
    let points = segments.map((segment) => segment.start);
    points.push(segments[segments.length - 1].end); // Close the polygon

    let n = points.length;
    let area = 0;

    // Apply the Shoelace formula
    for (let i = 0; i < n; i++) {
      let j = (i + 1) % n;
      area += points[i].x * points[j].y;
      area -= points[j].x * points[i].y;
    }

    // Return the absolute value of area divided by 2
    console.log(Math.abs(area) / 2);
  };
  if (drawingData === undefined || drawingData.length == 0) {
    console.log("empty list");
  } else {
    console.log(drawingData);
    calculatePolygonArea(drawingData);
  }
  return <div></div>;
}
