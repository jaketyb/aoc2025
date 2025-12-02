using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Day2
{
    internal static class Logic
    {

        public static long Part1()
        {
            var ranges = LoadRanges();

            long total = 0;

            foreach (var range in ranges)
            {
                var dashIndex = range.IndexOf('-');
                var start = long.Parse(range[..dashIndex]);
                var end = long.Parse(range[(dashIndex+1)..]);
                

                for (var i = start; i <= end; i++)
                {
                    var rangeStr = i.ToString();
                    if (rangeStr.Length % 2 != 0)
                        continue;


                    var firstHalf = rangeStr[..(rangeStr.Length / 2)];
                    var secondHalf = rangeStr[(rangeStr.Length / 2)..];

                    if (firstHalf == secondHalf)
                    {
                        total += i;
                    }
                }
            }


            return total;
        }

        public static long Part2()
        {
            var ranges = LoadRanges();

            long total = 0;

            foreach (var range in ranges)
            {
                var dashIndex = range.IndexOf('-');
                var start = long.Parse(range[..dashIndex]);
                var end = long.Parse(range[(dashIndex + 1)..]);


                for (var i = start; i <= end; i++)
                {
                    var productId = i.ToString();

                    var isInvalid = false;
                    for (var comparatorLength = 1; comparatorLength <= (productId.Length / 2) && !isInvalid; comparatorLength++)
                    {
                        if (productId.Length % comparatorLength != 0)
                            continue;

                        var compare = productId[..comparatorLength];

                        var repeatTimes = productId.Length / comparatorLength;

                        var allMatch = true;

                        for (var iteration = 0; iteration < repeatTimes && allMatch; iteration++)
                        {
                            var startIndex = iteration * comparatorLength;
                            var chunk = productId.Substring(startIndex, comparatorLength);

                            if (compare != chunk)
                                allMatch = false;
                        }

                        if (allMatch)
                            isInvalid = true;
                    }

                    if (isInvalid)
                    {
                        Console.WriteLine("Match: " + i);
                        total += i;
                    }


                }
            }


            return total;
        }

        private static IEnumerable<string> LoadRanges()
        {
            var contents = File.ReadLines("input.txt").First();

            return contents.Split(',');
        }
    }
}
