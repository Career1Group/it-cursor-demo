def foo_bar():
    """
    A simple foo bar function.

    Returns:
        str: Returns 'foo' if number is divisible by 3, 'bar' if divisible by 5,
             'foobar' if divisible by both, otherwise returns the number as string.
    """
    for i in range(1, 101):
        if i % 3 == 0 and i % 5 == 0:
            print("foobar")
        elif i % 3 == 0:
            print("foo")
        elif i % 5 == 0:
            print("bar")
        else:
            print(str(i))


def load_files():
    with open("file_1.txt", "r") as file_1, \
         open("file_2.txt", "r") as file_2, \
         open("file_3.txt", "r") as file_3, \
         open("file_4.txt", "r") as file_4, \
         open("file_5.txt", "r") as file_5, \
         open("file_6.txt", "r") as file_6, \
         open("file_7.txt", "r") as file_7:

    file_1_content = file_1.read()


if __name__ == "__main__":
    foo_bar()
