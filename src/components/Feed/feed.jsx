import styles from "./feed.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  wsConnectionStart,
  wsConnectionClosed,
} from "../../services/actions/wsActions";
import { useMatch } from "react-router-dom";
import FeedItem from "../Feeditem/feedItem";
import FeedInfo from "../Feedinfo/feedInfo";
function Feed() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(wsConnectionStart());
    return () => {
      dispatch(wsConnectionClosed());
    };
  }, []);
  const orders = useSelector((store) => store.wsReducer.messages.orders);
  const routeMatch = useMatch({ path: "/profile/orders" });
  return (
    <section className={styles.section}>
      <div className={styles.feed}>
        <ul className={styles.items}>
          {orders.map((item) => (
            <FeedItem
              key={item._id}
              number={item.number}
              name={item.name}
              status={item.status}
              createdAt={item.createdAt}
              components={item.ingredients}
              isUserOrders={routeMatch}
            />
          ))}
        </ul>
      </div>
      <div>
        <FeedInfo />
      </div>
    </section>
  );
}
export default Feed;
