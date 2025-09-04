import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
import FormInput from './formInput';

const SkillsSelector = ({ selected = [], onChange }) => {
  const [input, setInput] = useState('');
  const [selectedSkills, setSelectedSkills] = useState(selected);

  useEffect(() => {
    setSelectedSkills(selected);
  }, [selected]);

  const addSkill = (skill) => {
    const trimmedSkill = skill.trim();
    if (!trimmedSkill || selectedSkills.includes(trimmedSkill)) return;
    const updatedSkills = [...selectedSkills, trimmedSkill];
    setSelectedSkills(updatedSkills);
    onChange?.(updatedSkills);
    setInput('');
    Keyboard.dismiss();
  };

  const handleRemoveSkill = (skill) => {
    const updatedSkills = selectedSkills.filter(s => s !== skill);
    setSelectedSkills(updatedSkills);
    onChange?.(updatedSkills);
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
          onChangeText={setInput}
          onSubmitEditing={() => addSkill(input)}
          placeholder="Type a skill"
          style={styles.skillInput}
        />
      </View>

      {input.trim().length > 0 && (
        <TouchableOpacity onPress={() => addSkill(input)} style={styles.suggestion}>
          <Text>Add "{input}"</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 10 },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 8,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    margin: 4,
  },
  tagText: { marginRight: 6 },
  removeBtn: { fontSize: 16, color: '#1565c0' },
  skillInput: { borderWidth: 0, flexGrow: 1, marginBottom: 0, height: 36, paddingHorizontal: 0 },
  suggestion: { padding: 10, backgroundColor: '#f1f1f1', borderBottomWidth: 1, borderColor: '#ddd' },
});

export default SkillsSelector;
