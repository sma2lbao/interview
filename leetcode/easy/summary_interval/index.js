/**
 * 
 *   给定一个无重复元素的有序整数数组 nums 。
 *
 *   返回 恰好覆盖数组中所有数字 的 最小有序 区间范围列表。也就是说，nums 的每个元素都恰好被某个区间范围所覆盖，并且不存在属于某个范围但不属于 nums 的数字 x 。
 *
 *   来源：力扣（LeetCode）
 *   链接：https://leetcode-cn.com/problems/summary-ranges
 *   著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 * @param {number[]} nums
 * @return {string[]}
 * 
 */
// const summaryRanges = function(nums) {
//     const result = [];
//     let arry_gap = [];
//     for (let i = 0; i < nums.length; i++) {
//         let before = nums[i - 1];
//         let cur = nums[i];
//         let after = nums[i + 1];
//         if (before === undefined || before === cur - 1) {
//             arry_gap.push(cur)
//         } else {
//             result.push(arry_gap.length === 1 ? `${arry_gap[0]}` : `${arry_gap[0]}->${arry_gap[arry_gap.length - 1]}` )
//             arry_gap.length = 0
//             arry_gap.push(cur)
//         }
//     }
//     if (arry_gap.length) {
//         result.push(arry_gap.length === 1 ? `${arry_gap[0]}` : `${arry_gap[0]}->${arry_gap[arry_gap.length - 1]}` )
//     }
//     return result;
// };
const summaryRanges = function(nums) {
    let ret = []
    let i = 0;
    
    while (i < nums.length) {
        let low = i;
        i++
        while(i < nums.length && nums[i] - 1 === nums[i - 1]) {
            i++
        }
        let high = i - 1;
        ret.push(high > low ? `${nums[low]}->${nums[high]}` : `${nums[high]}`)
    }
    return ret
}

const result =summaryRanges([0,1,2,4,5,7])
console.log(result)