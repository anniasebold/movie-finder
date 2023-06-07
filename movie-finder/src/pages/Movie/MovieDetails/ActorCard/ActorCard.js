import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Col } from 'react-bootstrap';
import './ActorCard.scss';

function ActorCard({ actor }) {
  return (
    <Col xs={12} lg={3} md={4} sm={6}>
      <div className="cast-item">
        <div className="cast-img">
          {actor.profile_path ? (
          <img 
            src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
            alt={actor.name}>
          </img>
          ) : (
            <FontAwesomeIcon className="icon-no-photo" icon={faUser} />
          )
        }
        </div>
        <div className="cast-info">
          {actor.name}
          <br />
          <span className="small">{actor.character}</span>
        </div>
      </div>
    </Col>
  );
}

export default ActorCard;
