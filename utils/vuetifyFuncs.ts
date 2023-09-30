import { useTheme } from 'vuetify';

export const useVuetify = () => {
  const changeTheme = () => {
    const theme = useTheme();

    theme.global.name.value = theme.global.current.value.dark
      ? 'light'
      : 'dark';
  };

  const getTheme = () => {
    const theme = useTheme();

    return theme.global.name.value;
  };

  return { changeTheme, getTheme };
};
