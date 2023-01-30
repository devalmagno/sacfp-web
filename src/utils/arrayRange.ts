interface ArrayRange {
    start: number;
    stop: number;
    step: number;
}

const arrayRange = ({ start, stop, step }: ArrayRange) => 
    Array.from(
        { length: (stop - start) / step + 1 },
        (value, index) => start + index * step,
    );

export default arrayRange;