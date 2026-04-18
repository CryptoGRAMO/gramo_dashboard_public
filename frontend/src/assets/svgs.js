import React from "react"

const svgs = {
    poligon : (w,h) => <svg className="polygon" xmlns="http://www.w3.org/2000/svg" width={w ? w : "168"} height={h ? h : "160"} viewBox="0 0 168 160"><g id="Polygon_2" data-name="Polygon 2" fill="none" opacity="0.14"><path d="M84,0l84,160H0Z" stroke="none"></path><path d="M 84 4.302597045898438 L 3.308868408203125 158.0000305175781 L 164.6911315917969 158.0000305175781 L 84 4.302597045898438 M 84 0 L 168 160.0000305175781 L 0 160.0000305175781 L 84 0 Z" stroke="none" fill="#fff"></path></g></svg>,
    circle: (w,h) => <svg className="elipse" xmlns="http://www.w3.org/2000/svg" width={w ? w : "312"} height={h ? h : "307"} viewBox="0 0 312 307"><g id="Ellipse_3" data-name="Ellipse 3" fill="none" stroke="#fff" strokeWidth="3" opacity="0.13"><ellipse cx="156" cy="153.5" rx="156" ry="153.5" stroke="none"></ellipse><ellipse cx="156" cy="153.5" rx="154.5" ry="152" fill="none"></ellipse></g></svg>,
    circle2: (w,h) => <svg className="elipse2" xmlns="http://www.w3.org/2000/svg" width={w ? w : "312"} height={h ? h : "307"} viewBox="0 0 312 307"><g id="Ellipse_3" data-name="Ellipse 3" fill="none" stroke="#fff" strokeWidth="3" opacity="0.13"><ellipse cx="156" cy="153.5" rx="156" ry="153.5" stroke="none"></ellipse><ellipse cx="156" cy="153.5" rx="154.5" ry="152" fill="none"></ellipse></g></svg>,
    gramo : (w,h) => <svg width={w ? w : "55"} height={h ? h : "82"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 82 82">
    <g id="Layer_2" data-name="Layer 2" transform="translate(-10.924 -10.924)">
      <g id="Layer_1" data-name="Layer 1" transform="translate(13.551 13.551)">
        <path id="Path_1" data-name="Path 1" d="M146.1,122.13c2.236,0,4.473-.052,6.71.027a6.757,6.757,0,0,1,2.5.58,4.237,4.237,0,0,1,2.378,4.128c.073,3.837.046,7.676.014,11.514a5.5,5.5,0,0,1-2.914,4.795,34.944,34.944,0,0,1-13.091,4.955,33.175,33.175,0,0,1-13.018-.424c-6.852-1.694-12.011-5.579-15.032-12.048a30.148,30.148,0,0,1-2.288-16.623,25.909,25.909,0,0,1,3.059-9.747,19.958,19.958,0,0,1,9.487-8.714,29.957,29.957,0,0,1,20.774-1.435,16.3,16.3,0,0,1,10.107,7.345,11.839,11.839,0,0,1,1.319,3.3,4.395,4.395,0,0,1-2.672,5.156,4.686,4.686,0,0,1-5.724-1.717c-.746-1.06-1.463-2.135-2.22-3.19a10.017,10.017,0,0,0-6.758-4.165,15.74,15.74,0,0,0-9.256,1.054,13.127,13.127,0,0,0-6.912,7.657,25.984,25.984,0,0,0-1.057,13.3,16.521,16.521,0,0,0,3.291,8.011,12.782,12.782,0,0,0,8.557,4.79c5.292.744,10.181-.569,14.819-3.035a1.187,1.187,0,0,0,.494-.882c.043-2.185,0-4.371.034-6.558.008-.575-.191-.741-.746-.74-2.643,0-5.286,0-7.93-.058a8.693,8.693,0,0,1-2.1-.331,2.954,2.954,0,0,1-2.48-2.8,3.391,3.391,0,0,1,2.042-3.72,8.673,8.673,0,0,1,2.745-.506c1.955-.073,3.913-.023,5.871-.023Z" transform="translate(-95.969 -84.823)" fill="#fff"></path>
        <circle id="Ellipse_1" data-name="Ellipse 1" cx="38.5" cy="38.5" r="38.5" transform="translate(-0.127 -0.127)" fill="none" stroke="#fff" strokeWidth="5"></circle>
      </g>
    </g>
    </svg>
}

export default svgs