import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Image } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { TextInput } from 'react-native'
import Categories from '../components/categories'
import axios from 'axios'
import Recipes from '../components/recipes'

const HomeScreen = () => {
  const [activeCategory, setActiveCategory] = useState('Beef')
  const [categories, setCategories] = useState([])
  const [meals, setMeals] = useState([])

  useEffect(() => {
    getCategories()
    getRecipes()
  }, [])

  const handleChangeCategory = (category) => {
    getRecipes(category)
    setActiveCategory(category)
    setMeals([])
  }

  const getCategories = async () => {
    try {
      const response = await axios.get(
        'https://themealdb.com/api/json/v1/1/categories.php'
      )
      {
        // console.log('get categories ', response.data)
      }
      if (response && response.data) {
        setCategories(response.data.categories)
      }
    } catch {
      console.log('error: ', err.message)
    }
  }
  const getRecipes = async (category = 'Beef') => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`
      )
      {
        //console.log('get categories ', response.data)
      }
      if (response && response.data) {
        setMeals(response.data.meals)
      }
    } catch {
      console.log('error: ', err.message)
    }
  }

  return (
    <View className='flex-1 bg-white'>
      <StatusBar style='dark' />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className='space-y-6 pt-14'
      >
        {/*greeting and punchline */}
        <View className='mx-4 space-y-2 mb-2'>
          <View>
            <Text
              style={{ fontSize: hp(3.8) }}
              className='font-semibold text-neutral-600'
            >
              eatWell
            </Text>
          </View>
          <Text
            style={{ fontSize: hp(3.8) }}
            className='font-semibold text-neutral-600'
          >
            Bon <Text className='text-amber-400'>appétit</Text>
          </Text>
        </View>

        {/**categories */}
        <View>
          {categories.length > 0 && (
            <Categories
              categories={categories}
              activeCategory={activeCategory}
              handleChangeCategory={handleChangeCategory}
            />
          )}
        </View>

        {/**recipes */}
        <View>
          <Recipes meals={meals} categories={categories} />
        </View>
      </ScrollView>
    </View>
  )
}

export default HomeScreen
