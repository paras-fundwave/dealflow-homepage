import { useState, useRef, useCallback, useEffect } from "react";
import { userData, memberData } from "./data";
import "../Styles/LogComponent.scss";
import ActivityFilter from "./ActivityFilter";
import ActivityLogs from "./ActivityLogs";

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
  const [memberFilters, setMemberFilters] = useState([]);

  // for Cards
  const [commentData, setComments] = useState({});

  const authToken =
    "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJlRXV1UFlGbDRPTlJJZGc4OHpBaC1XNDl4NGZMdkJDQ1llZUoxVnBtVjZZIn0.eyJleHAiOjE2Mjc5ODI4NzQsImlhdCI6MTYyNzk3NTY3NCwiYXV0aF90aW1lIjoxNjI2NzU5NjU2LCJqdGkiOiI4YjMwYmVlYy1lMmJlLTRiNjgtYmI3Mi04MTAxNTQ5YjcwMzgiLCJpc3MiOiJodHRwczovL2lkLmZ1bmR3YXZlLmNvbS9hdXRoL3JlYWxtcy9zYW5kYm94IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjEzN2E3OGI1LWI1ZmMtNDc3Mi04ZTNiLTZiNmE0ZGI1YWQyYiIsInR5cCI6IkJlYXJlciIsImF6cCI6ImRlYWxmbG93LWFwcCIsInNlc3Npb25fc3RhdGUiOiI0MDE0YzY5ZC03MmY5LTQ5NDktOTY3OS1iOGE2MWM0MTM1ZTkiLCJhY3IiOiIxIiwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiJQYXJhcyBWZXJtYSIsInByZWZlcnJlZF91c2VybmFtZSI6InBhcmFzQGdldGZ1bmR3YXZlLmNvbSIsImdpdmVuX25hbWUiOiJQYXJhcyBWZXJtYSIsImVtYWlsIjoicGFyYXNAZ2V0ZnVuZHdhdmUuY29tIn0.ECksc68ugniq27pRztdW1eg6LZ93eaOVhYuZsHtTuiFrVDZOoC7pr-zdEKt5txknw0un-AbzQjtg4_W3iCzJIPCV88WIkvieWNly_g-DvNf1ZhyxADPX3O7prOuRg8ZR-lpKazjyvdXE5zjdwRJOIrR9VJZIfdZVtt5gm_CApi7SRuwrsTddSdco9F6P8MpGpe8pQ27p8oeyl6UWnRaffwB6Fy86OT36fA3bm_QEm1SOFfhwgTwwCgymAQI3_5LHISTqQ5X0TcC_Fd78QxCewrrznQP2KXVAvlEmZMD2mfKH0NGYf79rJBHAD9ra04Oj_TX4m4kr4JwGCyJtoNDTmQ";

  const url = "http://localhost:8080/filteredLogs";
  // "https://europe-west1-fw-microservices.cloudfunctions.net/activity-service-js/filteredLogs";

  const logGrid = useRef(null);

  // Functionality for comments under an activity
  async function fetchComments(activityId) {
    await fetch("http://localhost:9000/fetchComments", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
        product: "DEALFLOW",
        activityId,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
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

  async function sendComment(activityId, comment) {
    await fetch("http://localhost:9000/addComment", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
        product: "DEALFLOW",
        activityId,
      },
      body: JSON.stringify({
        comment,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setComments((prevState) => {
          if (prevState[activityId]) {
            return {
              ...prevState,
              [activityId]: [...prevState[activityId], data],
            };
          } else {
            return {
              ...prevState,
              [activityId]: [data],
            };
          }
        });
        setActivities((prevState) => {
          let newActivites = prevState.map((log) => {
            if (log._id === activityId) log.commentCount++;
            return log;
          });
          return [...newActivites];
        });
      });
  }

  async function deleteComment(commentId) {
    await fetch("http://localhost:9000/deleteComment", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
        product: "DEALFLOW",
        commentId,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setComments((prevState) => {
          return {
            ...prevState,
            [data.activityId]: prevState[data.activityId].filter(
              (comm) => comm._id !== data._id
            ),
          };
        });
        setActivities((prevState) => {
          let newActivites = prevState.map((log) => {
            if (log._id === data.activityId) log.commentCount--;
            return log;
          });
          return [...newActivites];
        });
      });
  }

  async function updateComment(commentId, comment) {
    console.log(commentId);
    await fetch("http://localhost:9000/updateComment", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
        product: "DEALFLOW",
        commentId,
      },
      body: JSON.stringify({
        comment,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setComments((prevState) => {
          return {
            ...prevState,
            [data.activityId]: prevState[data.activityId].map((comm) =>
              comm._id === data._id ? data : comm
            ),
          };
        });
      });
  }

  // Event Listners for events triggered by Lit Component on crud comments
  useEffect(() => {
    if (logGrid && logGrid.current) {
      logGrid.current.addEventListener("fetch-comments", (data) => {
        let { activityId, count, visible } = data.detail;
        if (count && visible === "false") {
          fetchComments(activityId);
        }
      });

      logGrid.current.addEventListener("send-comment", (data) => {
        let { activityId, comment } = data.detail;
        sendComment(activityId, comment);
      });

      logGrid.current.addEventListener("delete-comment", (data) => {
        let { commentId } = data.detail;
        console.log(commentId);
        deleteComment(commentId);
      });

      logGrid.current.addEventListener("update-comment", (data) => {
        let { commentId, comment } = data.detail;
        updateComment(commentId, comment);
      });
    }
  }, []);

  // triggered on filters are changed
  useEffect(() => {
    console.log("this shlou happen");
    setActivities([]);
    setComments({});
    if (pageNum > 1) {
      setPageNum(1);
    } else {
      fetchData(
        pageNum,
        pageSize,
        authToken,
        teamFilters.map((data) => data.Id),
        memberFilters.map((data) => data._id)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamFilters, memberFilters]);

  // triggered on pagination and filter updation
  useEffect(() => {
    fetchData(
      pageNum,
      pageSize,
      authToken,
      teamFilters.map((data) => data.Id),
      memberFilters.map((data) => data._id)
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
        console.trace(err);
        setError(true);
        setLoading(false);
      });
  }

  // For Pagination

  const observer = useRef();

  // Observing the last element
  const lastActivityRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        // if the last activity is one screen
        if (entries[0].isIntersecting && hasMore) {
          setPageNum((prevPgNum) => {
            // pageNum incremented
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
        <ActivityFilter
          teamFilters={teamFilters}
          setTeamFilters={setTeamFilters}
          memberFilters={memberFilters}
          setMemberFilters={setMemberFilters}
        />
      </header>

      <div id="log-grid" ref={logGrid}>
        {activities.map((activity, index) => {
          return (
            <>
              <ActivityLogs
                key={index}
                ref={activities.length === index + 1 ? lastActivityRef : null}
                activity={activity}
                userData={userData}
                memberData={memberData}
                comments={commentData}
              />
            </>
          );
        })}
      </div>
      <div style={{ textAlign: "center", width: "100%" }}>
        {(loading && "Loading...") || (error && "Error")}
      </div>
    </main>
  );
}

export default Logs;
