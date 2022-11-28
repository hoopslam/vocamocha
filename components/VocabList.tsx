import { View, FlatList, StyleSheet } from 'react-native';
import { Word } from '../types/types';
import WordItem from './WordItem';

interface Props {
    words: Word[];
    onDeleteHandler: (id: string) => void;
}

const VocabList = ({ words, onDeleteHandler }: Props) => {
    return (
        <View style={styles.listContainer}>
            <FlatList
                data={words}
                renderItem={(flatListItem) => (
                    <WordItem
                        word={flatListItem.item}
                        onDelete={onDeleteHandler}
                    />
                )}
                keyExtractor={(item) => {
                    return item.id;
                }}
                alwaysBounceVertical={false}
            />
        </View>
    );
};

export default VocabList;

const styles = StyleSheet.create({
    listContainer: {
        margin: 20,
        width: `85%`,
    },
});
