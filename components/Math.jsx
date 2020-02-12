import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const Math = props => <BlockMath>{props.children}</BlockMath>;

export default Math;
