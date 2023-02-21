interface CustomTimelineProps {
    start: any;
    progress: number;
    end: any;
  }

  const CustomTimeline: React.FC<CustomTimelineProps> = (
    props: CustomTimelineProps
  ) => {
    return (
      <div className="flex align-items-center">
        <div className="timeline__start-date d-flex">{props.start}</div>

        <div className="timeline__outline">
          <div
            style={{ width: `${props.progress}%` }}
            className="timeline__progress"
          ></div>
        </div>
        <div className="timeline__end-date d-flex">{props.end}</div>
      </div>
    );
  };

  export default CustomTimeline