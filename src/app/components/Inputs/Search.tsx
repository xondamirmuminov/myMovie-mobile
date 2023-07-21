import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Icon, Input} from 'native-base';
import {useTranslation} from 'react-i18next';
import Feather from 'react-native-vector-icons/Feather';

interface ISearchInputProps {
  onChange: (value: string) => void;
  width?: number | string;
  flex?: number | string;
  placeholder?: string;
}

const SearchInput = ({
  onChange,
  width,
  flex,
  placeholder,
}: ISearchInputProps) => {
  const [search, setSearch] = useState<string>('');
  const {t} = useTranslation();

  useEffect(() => {
    if (!search) {
      onChange('');
    }
  }, [search]);

  return (
    <Input
      flex={flex}
      width={width ?? '300px'}
      placeholder={t(placeholder ?? 'Search')}
      keyboardType="web-search"
      returnKeyType="search"
      type="text"
      value={search}
      onChangeText={text => setSearch(text)}
      onSubmitEditing={(event: any) => onChange(event.nativeEvent.text)}
      InputLeftElement={
        <Icon
          as={Feather}
          name="search"
          color="darkGray.100"
          style={styles.inputIcon}
          size="20px"
        />
      }
    />
  );
};

const styles = StyleSheet.create({
  inputIcon: {
    marginLeft: 18,
    marginRight: 2,
  },
});

export default SearchInput;
