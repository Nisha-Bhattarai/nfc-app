import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
import FormInput from './formInput';
import Colors from '../constants/Colors';

const predefinedSkills = [
  'JavaScript', 'React', 'React Native', 'Node.js', 'Python', 'Figma', 'UI/UX'
];

const SkillsSelector = () => {
  const [input, setInput] = useState('');
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const handleInputChange = (text) => {
    setInput(text);
    const filtered = predefinedSkills.filter(skill =>
      skill.toLowerCase().includes(text.toLowerCase()) &&
      !selectedSkills.includes(skill)
    );
    setFilteredSkills(filtered);
  };

  const addSkill = (skill) => {
    if (skill.trim().length === 0 || selectedSkills.includes(skill)) return;
    setSelectedSkills([...selectedSkills, skill]);
    setInput('');
    setFilteredSkills([]);
    Keyboard.dismiss();
  };

  const handleRemoveSkill = (skill) => {
    setSelectedSkills(selectedSkills.filter(s => s !== skill));
  };

  return (
    <View style={styles.container}>
      <View style={styles.tagsContainer}>
        {selectedSkills.map((skill, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{skill}</Text>
            <TouchableOpacity onPress={() => handleRemoveSkill(skill)}>
              <Text style={styles.removeBtn}>×</Text>
            </TouchableOpacity>
          </View>
        ))}

        <FormInput
          value={input}
          onChangeText={handleInputChange}
          onSubmitEditing={() => addSkill(input)}
          placeholder="Type a skill"
          style={styles.skillInput}
        />
      </View>

      {input.length > 0 && filteredSkills.length > 0 && (
        <View>
          {filteredSkills.map((item) => (
            <TouchableOpacity key={item} onPress={() => addSkill(item)} style={styles.suggestion}>
              <Text>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {input.length > 0 && filteredSkills.length === 0 && (
        <TouchableOpacity onPress={() => addSkill(input)} style={styles.suggestion}>
          <Text>Add "{input}"</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  tagsContainer: {
    flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#ccc',
  padding: 8,
  borderRadius: 8,
  maxWidth: '100%',
    fontFamily: 'Lato_400Regular',
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    margin: 4
  },
  tagText: {
    marginRight: 6
  },
  removeBtn: {
    fontSize: 16,
    color: '#1565c0'
  },
  skillInput: {
    borderWidth: 0,
    flexGrow: 1,
    marginBottom: 0,
    height: 36,
    paddingHorizontal: 0
  },
  suggestion: {
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderBottomWidth: 1,
    borderColor: '#ddd'
  }
});

export default SkillsSelector;
