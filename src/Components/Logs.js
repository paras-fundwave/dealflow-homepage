import { useState, useRef, useCallback, useEffect } from "react";
import "../Styles/LogComponent.scss";
import "@fundwave/activity-component/src/logCard.js";
import ActivityFilter from "./ActivityFilter";
import { userData } from "./dealdata";

function Logs() {
  // for fetch req and pagination
  const [pageNum, setPageNum] = useState(1);
  const [pageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [activities, setActivities] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  // for filters
  const [teamFilters, setTeamFilters] = useState([]);
  const [userFilters, setUserFilters] = useState([]);

  // for Cards
  const [comments, setComments] = useState({});

  const authToken =
    "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJlRXV1UFlGbDRPTlJJZGc4OHpBaC1XNDl4NGZMdkJDQ1llZUoxVnBtVjZZIn0.eyJleHAiOjE2Mjc1MDA0ODYsImlhdCI6MTYyNzQ5MzI4NiwiYXV0aF90aW1lIjoxNjI2NzU5NjU2LCJqdGkiOiIyYzhlMWVlMC0wMTc4LTQ0OTItYmRjMS1iNmFkODNlYTZiOGEiLCJpc3MiOiJodHRwczovL2lkLmZ1bmR3YXZlLmNvbS9hdXRoL3JlYWxtcy9zYW5kYm94IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjEzN2E3OGI1LWI1ZmMtNDc3Mi04ZTNiLTZiNmE0ZGI1YWQyYiIsInR5cCI6IkJlYXJlciIsImF6cCI6ImRlYWxmbG93LWFwcCIsInNlc3Npb25fc3RhdGUiOiI0MDE0YzY5ZC03MmY5LTQ5NDktOTY3OS1iOGE2MWM0MTM1ZTkiLCJhY3IiOiIxIiwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiJQYXJhcyBWZXJtYSIsInByZWZlcnJlZF91c2VybmFtZSI6InBhcmFzQGdldGZ1bmR3YXZlLmNvbSIsImdpdmVuX25hbWUiOiJQYXJhcyBWZXJtYSIsImVtYWlsIjoicGFyYXNAZ2V0ZnVuZHdhdmUuY29tIn0.KnO5xToZ3nKgktB5Anor3F81UtBi7PTLB_Tfr7i967xc23Hwe1N2VDqufPuPp8yCry0Iv4h4Nec5wbyCx4UjqzUPjP0tPefdwLI_7_9X4HCw8Z_fedFIFlA5ffrxtz0AU7wTkY1LyU4iH47g33Bcc8yxotSiNbe074_i3f4oRjqOQDKzqNvURZPf_fGnpvro70rVD8j9C0okdA9_eeQG3JTlquWeH1in206cRdrqSLjVmTKAAoYnaF31uafFaDBGgsn6UHMiAG_uTgoos8kU7T68SSJ-LSJqMkmQWDqLWYiJ4SM9_PcykuTm2DCDaXKI2kyNGgUzIZ7xU9U_FHkPTQ";

  const url = "http://localhost:8080/filteredLogs";
  // "https://europe-west1-fw-microservices.cloudfunctions.net/activity-service-js/filteredLogs";

  async function fetchComments(activityId) {
    console.trace("fetching data", { loading });
    await fetch("http://localhost:9000/fetchComments", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
        product: "DEALFLOW",
        activityId: activityId,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setLoading(false);
        if (data.length > 0)
          setComments((prevState) => {
            if (prevState[activityId])
              return {
                ...prevState,
                [activityId]: [...prevState[activityId], ...data],
              };
            else
              return {
                ...prevState,
                [activityId]: [...data],
              };
          });
      });
  }

  useEffect(() => {
    console.log("wtf");
    let activityCards = document.querySelector("#log-grid");
    activityCards.addEventListener("fetch-comments", (data) => {
      let { activityId, count, visible } = data.detail;
      // console.log({ count, visible, loading });
      // console.log(count && visible === "false" && loading === false);
      if (count && visible === "false" && loading === false) {
        setLoading(true);
        fetchComments(activityId);
      }
    });
    // let activityCards = document.querySelectorAll("#log-grid activity-log");
    // activityCards.forEach((ele) => {
    //   ele.addEventListener("fetch-comments", (data) => {
    //     let { activityId, count, visible } = data.detail;
    //     console.log(count, visible);
    //     if (count > 0 && visible === "false") fetchComments(activityId);
    //   });
    // });

    // return function cleanup() {
    //   let activityCards = document.querySelectorAll("#log-grid activity-log");
    //   activityCards.forEach((ele) => {
    //     ele.removeEventListener("fetch-comments", (e) =>
    //       console.log("bbye", e)
    //     );
    //   });
    // };
  }, []);

  useEffect(() => {
    setActivities([]);
    fetchData(
      pageNum,
      pageSize,
      authToken,
      teamFilters.map((data) => data.Id),
      userFilters.map((data) => data._id)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamFilters, userFilters]);

  useEffect(() => {
    fetchData(
      pageNum,
      pageSize,
      authToken,
      teamFilters.map((data) => data.Id),
      userFilters.map((data) => data._id)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNum]);

  async function fetchData(
    pageNum,
    pageSize,
    authToken,
    teamIds = [],
    userIds = []
  ) {
    setLoading(true);
    setError(false);

    fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
        product: "DEALFLOW",
        teamid: teamIds,
        userId: userIds,
      },
      body: JSON.stringify({
        pageNum: pageNum,
        pageSize: pageSize,
      }),
    })
      .then((data) => data.json())
      .then((res) => {
        if (res.activities !== undefined) {
          setHasMore(true);
          setActivities((prevActivites) => {
            return [...prevActivites, ...res.activities];
          });
        } else setHasMore(false);
        setLoading(false);
      })
      .catch((err) => {
        // console.trace(err);
        setError(true);
        setLoading(false);
      });
  }

  const observer = useRef();

  const lastActivityRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNum((prevPgNum) => {
            return prevPgNum + 1;
          });
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <main className="LogComponent">
      <header className="page-header">
        <h2>
          <strong className="page-title">Activity Logs</strong>
        </h2>
        {
          <ActivityFilter
            teamFilters={teamFilters}
            setTeamFilters={setTeamFilters}
            userFilters={userFilters}
            setUserFilters={setUserFilters}
          />
        }
      </header>

      <div id="log-grid">
        {activities.map((activity, index) => {
          return (
            <activity-log
              ref={activities.length === index + 1 ? lastActivityRef : null}
              key={index}
              actor={userData[activity.userId].name}
              entityType={activity.entityType}
              entityName={activity.entityName}
              entityID={activity.entityID}
              activityId={activity._id}
              activityType={activity.type}
              activityTime={activity.date}
              teamName={activity.teamId}
              teamId={activity.teamId}
              comment={activity.comment}
              title={activity.title}
              count={activity.commentCount}
              comments={JSON.stringify(comments[activity._id])}
              commentVisible={false}
              visible={false}
              displayImage={`https://ui-avatars.com/api/?name=${
                userData[activity.userId].name
              }&size=38&background=444&color=fff`}
              level="home"
            ></activity-log>
          );
        })}
        <span style={{ textAlign: "center", width: "100%" }}>
          {loading && "Loading..."}
          {error && "Error"}
        </span>
      </div>
    </main>
  );
}

export default Logs;
