import { CLEAR, ClearAction } from '../actions/clear';
import {
  SetAudiogramInputAction,
  SET_AUDIOGRAM_TEXT,
} from '../actions/audiogram';
import { IAudiogramInputs } from '../interfaces';

const audiogramDefault: IAudiogramInputs = {
  remarks: '',
  hearingAidTrial: '',
};

export const audiogramReducer = (
  audiogram = audiogramDefault,
  action: SetAudiogramInputAction | ClearAction
): IAudiogramInputs => {
  switch (action.type) {
    case CLEAR:
      return audiogramDefault;
    case SET_AUDIOGRAM_TEXT:
      return {
        ...audiogram,
        [action.name]: action.value,
      };
    default:
      return audiogram;
  }
};
