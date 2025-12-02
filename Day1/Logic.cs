using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Day1
{
    internal static class Logic
    {

        public static string Day1()
        {
            var rotations = LoadRotations();
            var pointer = 50;
            var password = 0;

            foreach (var rotation in rotations)
            {
                var direction = rotation[..1];
                var rest = int.Parse(rotation[1..]);

                if (direction == "L")
                {
                    pointer -= rest;
                }
                else
                {
                    pointer += rest;
                }

                pointer %= 100;

                if (pointer == 0)
                {
                    password++;
                }
            }

            return password.ToString();
        }

        public static string Day2()
        {
            var rotations = LoadRotations();
            var pointer = 50;
            var password = 0;

            foreach (var rotation in rotations)
            {
                var direction = rotation[..1];
                var rest = int.Parse(rotation[1..]);

                for (var i = 0; i < rest; i++)
                {
                    if (direction == "L")
                    {
                        pointer--;
                    }
                    else
                    {
                        pointer++;
                    }

                    pointer = pointer switch
                    {
                        100 => 0,
                        -1 => 99,
                        _ => pointer
                    };

                    if (pointer is 0)
                    {
                        password++;
                    }
                }
            }

            return password.ToString();
        }

        private static IEnumerable<string> LoadRotations()
        {
            var contents = File.ReadAllLines("Input.txt");

            //var contents = new[] { "R1000" };

            return contents;
        }
    }
}
