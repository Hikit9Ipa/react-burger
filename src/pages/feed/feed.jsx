import styles from './feed.module.css';
import Feed from '../../components/Feed/feed';
 
export function FeedPage () {
 return (
  <section className={ styles.section }>
    <div>
    <h1 className={ `${styles.title} text text_type_main-large text_color_primary pl-5` }>Лента заказов</h1>
    <Feed />
    </div>
  </section>
 );
}