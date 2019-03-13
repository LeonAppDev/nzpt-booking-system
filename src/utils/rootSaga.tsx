import highTeaSaga from '../reducers/hightea/saga';

export default function* rooSaga() {

    yield [
        ...highTeaSaga
    ];
};