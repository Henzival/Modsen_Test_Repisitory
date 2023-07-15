import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/App.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useLocation, useNavigate } from 'react-router-dom';


const Main = function() {
    let data = useLocation();
    data.state.passedInfo[4] = data.state.passedInfo[4].substring(0, 200);
    console.log(data);

    const navigate = useNavigate();

    const navigation = (count) => {
        navigate('/main');
    }
    console.log(data.state.passedInfo[6]);

    return (
        <section className="main">
            <div className='info-container'>
                <div className='split image-container left'>
                <div className='centered'>
                    <a href={data.state.passedInfo[5]} className='book-link'>
                    <img src={data.state.passedInfo[3]} className='info-image' />
                    </a>
                </div>
                </div>
                <div className='split info-text right'>
                    <div className='centered'>
                    <span class="close" onClick={() => {navigation(data.state.passedInfo[6])}}>&times;</span>
                    <a href={data.state.passedInfo[5]} className='book-link'>
                    <h3 className='book-category main-cat'>{data.state.passedInfo[1] + ''}</h3>
                    <h3 className='book-title main-title'>{data.state.passedInfo[0]}</h3>            
                    <h3 className='book-author main-author'>{data.state.passedInfo[2] + ''}</h3>
                    <p className='description'>{data.state.passedInfo[4] + '...'}</p>
                    </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Main;
