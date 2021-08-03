import "@fundwave/activity-component/index";
import { forwardRef } from "react";

function ActivityLogs(props, ref) {
  let { activity, userData, memberData, comments } = props;
  activity.comments = comments[[activity._id]];
  return (
    <activity-log
      ref={ref}
      activity={JSON.stringify(activity)}
      actor={memberData[activity.userId].name}
      userId={userData._id}
      comments={JSON.stringify(comments[activity._id])}
      commentVisible={false}
      visible={false}
      displayImage={`https://ui-avatars.com/api/?name=${
        memberData[activity.userId].name
      }&size=38&background=444&color=fff`}
      level="home"
    ></activity-log>
  );
}

export default forwardRef(ActivityLogs);
