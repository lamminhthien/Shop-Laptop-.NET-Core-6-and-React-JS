import React from 'react';
import axios from 'axios';
export default class BrandList extends React.Component {
  state = {
    brands: []
  }

  // componentDidMount() {
  //   axios.get(`https://localhost:44372/api/HangSanXuats`)
  //     .then(res => {
  //       const brands = res.data;
  //       this.setState({ brands });
  //     })
  //     .catch(error => console.log(error));
  // }

  render() {
    return (

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="p-4">
                <div class="flex items-center">
                  <input id="checkbox-all" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label for="checkbox-all" class="sr-only">checkbox</label>
                </div>
              </th>
              <th scope="col" class="px-6 py-3">
                Product name
              </th>
              <th scope="col" class="px-6 py-3">
                Color
              </th>
              <th scope="col" class="px-6 py-3">
                Category
              </th>
              <th scope="col" class="px-6 py-3">
                Price
              </th>
              <th scope="col" class="px-6 py-3">
                <span class="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td class="w-4 p-4">
                <div class="flex items-center">
                  <input id="checkbox-table-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label for="checkbox-table-1" class="sr-only">checkbox</label>
                </div>
              </td>
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                Apple MacBook Pro 17"
              </th>
              <td class="px-6 py-4">
                Sliver
              </td>
              <td class="px-6 py-4">
                Laptop
              </td>
              <td class="px-6 py-4">
                $2999
              </td>
              <td class="px-6 py-4 text-right">
                <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
              </td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td class="w-4 p-4">
                <div class="flex items-center">
                  <input id="checkbox-table-2" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label for="checkbox-table-2" class="sr-only">checkbox</label>
                </div>
              </td>
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                Microsoft Surface Pro
              </th>
              <td class="px-6 py-4">
                White
              </td>
              <td class="px-6 py-4">
                Laptop PC
              </td>
              <td class="px-6 py-4">
                $1999
              </td>
              <td class="px-6 py-4 text-right">
                <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
              </td>
            </tr>
            <tr class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td class="w-4 p-4">
                <div class="flex items-center">
                  <input id="checkbox-table-3" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label for="checkbox-table-3" class="sr-only">checkbox</label>
                </div>
              </td>
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                Magic Mouse 2
              </th>
              <td class="px-6 py-4">
                Black
              </td>
              <td class="px-6 py-4">
                Accessories
              </td>
              <td class="px-6 py-4">
                $99
              </td>
              <td class="px-6 py-4 text-right">
                <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      // <ul>
      //   { this.state.brands.map(brand => <li>{brand.tenHangSx}</li>)}
      // </ul>
    )
  }
}