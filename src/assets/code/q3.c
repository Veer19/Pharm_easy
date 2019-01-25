/* A news organization had hired a programmer of questionable competence to produce reports on the campaign for the Republican nomination. 
The program somehow failed to print the name of "Ron Paul". 
Can you spot the problem?
*/

#include <stdio.h>
#include <string.h>
void print( const char * );
int main()
{
    print( "Mitt Romney" );
    print( "Newt Gingrich" );
    print( "Rick Santorum" );
    print( "Ron Paul" );
    return 0;
}
void print( const char *name )
{
    int indent = 100 / (strlen(name) - 8) / 2;
    for( int i = 0; i < indent; i++ )
        printf( " " );
    printf( "%s\n", name );
}
