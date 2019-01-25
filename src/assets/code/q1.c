#include <stdio.h>
#define LENGTH 10
char a[LENGTH] = "567891234";
int ith_character( int );

int main()
{
    int len = sizeof(a[LENGTH]);
    printf("It's time to celebrate"
    " the %cth of July\n",ith_character( len-2 ) );
    return 0;
}
int ith_character( int n )
{
    return a[n];
}
