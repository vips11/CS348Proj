import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { Typography } from "@mui/material";

const TimeLineItem = (data) => {
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineConnector />
        <TimelineDot />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent sx={{ py: "20px", px: 2 }}>
        <Typography variant="h5" component="span">
          {data.term}
        </Typography>
        <Typography>
          {data.type === "study"
            ? data.courses.join(", ")
            : data.positionTitle + " @ " + data.employerName}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
};

const TimeLine = ({ data }) => {
  return (
    <Timeline position="alternate">
      {data.map((x) => TimeLineItem(x))}

      <TimelineItem>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot color="primary" />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: "20px", px: 2 }}>
          <Typography variant="h5" component="span">
            Coop 2
          </Typography>
          <Typography>Data Scientist @ DEF Corp.</Typography>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
};

export default TimeLine;
