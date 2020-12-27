import { IAudiogramInputs } from '../interfaces';

export const SET_AUDIOGRAM_TEXT = 'SET_AUDIOGRAM_TEXT';

export interface SetAudiogramInputAction {
  type: typeof SET_AUDIOGRAM_TEXT;
  name: keyof IAudiogramInputs;
  value: string;
}

export const setAudiogramInput = (
  name: keyof IAudiogramInputs,
  value: string
): SetAudiogramInputAction => ({
  type: SET_AUDIOGRAM_TEXT,
  name,
  value,
});
