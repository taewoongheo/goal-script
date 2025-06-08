import React from 'react';
import {View, Platform, FlatList} from 'react-native';
import {Pressable} from 'react-native-gesture-handler';
import {BlurView} from 'expo-blur';
import {scale} from 'react-native-size-matters';
import {AntDesign, FontAwesome5, MaterialIcons} from '@expo/vector-icons';
import {viewportHeight, viewportWidth} from '@/utils/viewport';
import {Theme} from '@/constants/Theme';
import {useToggleExpand} from '@/hooks/useToggleExpand';

interface Goal {
  id: string;
  icon: string;
}

interface BottomTabBarProps {
  goalData: Goal[];
  setSelectedGoalId: (id: string) => void;
  selectedGoalId: string;
  onAddGoal: () => void;
  onToggleExpand: (key: ToggleKey) => void;
}

function BottomTabBar({
  goalData,
  setSelectedGoalId,
  selectedGoalId,
  onAddGoal,
  onToggleExpand,
}: BottomTabBarProps) {
  const {handleToggle} = useToggleExpand();

  return (
    <View
      style={{
        position: 'absolute',
        bottom: viewportHeight * 0.06,
        left: viewportWidth * 0.06,
        right: viewportWidth * 0.06,
        height: viewportHeight * 0.08,
        zIndex: 1000,
        elevation: 1000,
      }}>
      <BlurView
        intensity={50}
        blurReductionFactor={0.2}
        experimentalBlurMethod="dimezisBlurView"
        tint="light"
        style={{
          alignSelf: 'center',
          backgroundColor:
            Platform.OS === 'ios'
              ? 'rgba(190, 190, 190, 0.3)'
              : 'rgba(230, 230, 230, 0.9)',
          borderWidth: Platform.OS === 'ios' ? 0.4 : 0.5,
          borderColor: 'rgba(66, 66, 66, 0.3)',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: Theme.spacing.large,
          paddingVertical: Theme.spacing.medium - scale(5),
          borderRadius: Theme.borderRadius.medium,
          overflow: 'hidden',
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            gap: scale(20),
          }}>
          <Pressable onPress={onAddGoal}>
            <AntDesign
              name="plussquare"
              size={Theme.iconSize.large + scale(2)}
              color="black"
            />
          </Pressable>
          {/* <Pressable onPress={onSettings}>
            <Ionicons
              name="settings-sharp"
              size={Theme.iconSize.large}
              color="black"
            />
          </Pressable> */}
          {goalData.length > 0 && (
            <>
              <View
                style={{
                  width: scale(15),
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    backgroundColor: 'rgba(92, 92, 92, 0.3)',
                    width: scale(1.5),
                    height: Theme.spacing.large,
                  }}
                />
              </View>
              <FlatList
                data={goalData}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  gap: scale(20),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                style={{
                  flexGrow: 0,
                }}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                  <Pressable
                    onPress={() => {
                      onToggleExpand('');
                      setSelectedGoalId(item.id);
                    }}>
                    <FontAwesome5
                      name={item.icon}
                      size={Theme.iconSize.medium}
                      color={
                        selectedGoalId === item.id
                          ? 'black'
                          : 'rgb(147, 147, 147)'
                      }
                    />
                  </Pressable>
                )}
              />
            </>
          )}
        </View>
      </BlurView>
    </View>
  );
}

export default BottomTabBar;
