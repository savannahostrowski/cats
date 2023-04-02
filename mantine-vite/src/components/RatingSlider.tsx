import { Slider } from '@mantine/core';
import { IconHeart} from '@tabler/icons-react';

const styles = {
    thumb:
    {
        borderWidth: 2,
        height: 26,
        width: 26,
        padding: 3
    }
}

const RatingSlider = (props: { handleSliderValue: Function }) => {
  return (
      <Slider
          thumbChildren={<IconHeart size="1rem" stroke={1.5} />}
          color="pink"
          label={null}
          defaultValue={0}
          styles={styles}

          onChangeEnd={
              (value) => {
                  props.handleSliderValue(value);
              }
          }
      />
  );
}
export default RatingSlider;