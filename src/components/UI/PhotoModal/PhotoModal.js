import styled from 'styled-components'

export  const PhotoModal = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    overflow: hidden;
    width: 100%;
    background-color: rgb(20, 20, 20);
    z-index: 100;
    visibility: ${ (props) => props.vissible ? 'vissible' : 'hidden'};
    opacity: ${ (props) => props.vissible ? '1' : '0'};
    display:flex;
    flex-direction : column;
    box-sizing:border-box;
    
`