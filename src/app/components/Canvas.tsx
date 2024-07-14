import React from "react";

interface Canvas {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

type CanvasProps = {};

class Canvas extends React.Component<CanvasProps>{
  constructor(props: CanvasProps){
    super(props);

    this.canvasRef = React.createRef();
  }

  render(): JSX.Element{
    return (
      <>
        <canvas
          ref={this.canvasRef}
          width="700px"
          height="900px"
        />
      </>
    )
  }
}

export { Canvas };